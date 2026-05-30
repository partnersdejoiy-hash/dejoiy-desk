<?php
/**
 * In-portal notifications (polling). Can be extended with webhooks.
 *
 * @package DejoiySupportCenter
 */

defined( 'ABSPATH' ) || exit;

class Dejoiy_SC_Notifications {

	public static function init(): void {
		add_action( 'dejoiy_sc_notifications_cleanup', [ self::class, 'cleanup_old' ] );
		if ( ! wp_next_scheduled( 'dejoiy_sc_notifications_cleanup' ) ) {
			wp_schedule_event( time(), 'daily', 'dejoiy_sc_notifications_cleanup' );
		}
	}

	public static function create_tables(): void {
		global $wpdb;
		require_once ABSPATH . 'wp-admin/includes/upgrade.php';

		$charset = $wpdb->get_charset_collate();
		$notif   = self::table();
		$tickets = self::tickets_table();

		dbDelta(
			"CREATE TABLE {$notif} (
				id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
				wp_user_id bigint(20) unsigned NOT NULL,
				event_type varchar(64) NOT NULL,
				payload longtext NULL,
				is_read tinyint(1) DEFAULT 0,
				created_at datetime NOT NULL,
				PRIMARY KEY  (id),
				KEY wp_user_id (wp_user_id),
				KEY is_read (is_read)
			) {$charset};"
		);

		dbDelta(
			"CREATE TABLE {$tickets} (
				id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
				wp_user_id bigint(20) unsigned NOT NULL,
				zammad_ticket_id bigint(20) unsigned NOT NULL,
				ticket_number varchar(32) NOT NULL,
				subject varchar(255) NOT NULL,
				order_id bigint(20) unsigned DEFAULT 0,
				product_id bigint(20) unsigned DEFAULT 0,
				seller_id bigint(20) unsigned DEFAULT 0,
				created_at datetime NOT NULL,
				PRIMARY KEY  (id),
				KEY wp_user_id (wp_user_id),
				KEY zammad_ticket_id (zammad_ticket_id),
				KEY order_id (order_id),
				KEY seller_id (seller_id)
			) {$charset};"
		);
	}

	public static function table(): string {
		global $wpdb;
		return $wpdb->prefix . 'dejoiy_notifications';
	}

	public static function tickets_table(): string {
		global $wpdb;
		return $wpdb->prefix . 'dejoiy_tickets';
	}

	/**
	 * @param array<string,mixed> $payload
	 */
	public static function queue( int $wp_user_id, string $event_type, array $payload ): void {
		global $wpdb;
		$wpdb->insert(
			self::table(),
			[
				'wp_user_id'  => $wp_user_id,
				'event_type'  => sanitize_key( $event_type ),
				'payload'     => wp_json_encode( $payload ),
				'is_read'     => 0,
				'created_at'  => current_time( 'mysql', true ),
			],
			[ '%d', '%s', '%s', '%d', '%s' ]
		);
	}

	/**
	 * @return array<int,array<string,mixed>>
	 */
	public static function list_for_user( int $wp_user_id, bool $unread_only = false ): array {
		global $wpdb;
		$table = self::table();
		$sql   = "SELECT * FROM {$table} WHERE wp_user_id = %d";
		if ( $unread_only ) {
			$sql .= ' AND is_read = 0';
		}
		$sql .= ' ORDER BY id DESC LIMIT 50';

		$rows = $wpdb->get_results( $wpdb->prepare( $sql, $wp_user_id ), ARRAY_A );
		if ( ! $rows ) {
			return [];
		}

		return array_map(
			static function ( $row ) {
				$row['payload'] = json_decode( (string) $row['payload'], true ) ?: [];
				return $row;
			},
			$rows
		);
	}

	public static function mark_read( int $wp_user_id, int $notification_id ): bool {
		global $wpdb;
		return (bool) $wpdb->update(
			self::table(),
			[ 'is_read' => 1 ],
			[
				'id'         => $notification_id,
				'wp_user_id' => $wp_user_id,
			],
			[ '%d' ],
			[ '%d', '%d' ]
		);
	}

	public static function cleanup_old(): void {
		global $wpdb;
		$table = self::table();
		$wpdb->query(
			$wpdb->prepare(
				"DELETE FROM {$table} WHERE created_at < %s",
				gmdate( 'Y-m-d H:i:s', time() - 90 * DAY_IN_SECONDS )
			)
		);
	}
}
