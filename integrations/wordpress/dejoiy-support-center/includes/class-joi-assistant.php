<?php
/**
 * JOI Support Assistant — KB-first, ticket prefill on escalation.
 *
 * @package DejoiySupportCenter
 */

defined( 'ABSPATH' ) || exit;

class Dejoiy_SC_Joi_Assistant {

	/**
	 * @return array<string,mixed>
	 */
	public static function chat( string $message, array $context = [] ): array {
		$message = trim( $message );
		if ( '' === $message ) {
			return [
				'reply'          => __( 'Hi! I am JOI. How can I help you today?', 'dejoiy-support-center' ),
				'suggestions'    => [],
				'offer_ticket'   => false,
				'ticket_prefill' => [],
			];
		}

		$hits = Dejoiy_SC_Knowledge_Base::search( $message, 3 );

		if ( $hits ) {
			$best    = $hits[0];
			$related = array_slice( $hits, 1 );
			$reply   = sprintf(
				/* translators: %s: article title */
				__( 'I found something that may help: **%s**', 'dejoiy-support-center' ),
				$best['title']
			) . "\n\n" . $best['content'];

			if ( $related ) {
				$reply .= "\n\n" . __( 'Related:', 'dejoiy-support-center' );
				foreach ( $related as $item ) {
					$reply .= "\n• " . $item['title'];
				}
			}

			$reply .= "\n\n" . __( 'Did this answer your question?', 'dejoiy-support-center' );

			return [
				'reply'          => $reply,
				'suggestions'    => array_column( $hits, 'title' ),
				'offer_ticket'   => true,
				'ticket_prefill' => self::prefill_from_message( $message, $context ),
				'articles'       => $hits,
			];
		}

		return [
			'reply'          => __( "I couldn't find a clear answer in our Help Center. Would you like me to create a support ticket for you?", 'dejoiy-support-center' ),
			'suggestions'    => [],
			'offer_ticket'   => true,
			'ticket_prefill' => self::prefill_from_message( $message, $context ),
			'articles'       => [],
		];
	}

	/**
	 * @param array<string,mixed> $context
	 * @return array<string,mixed>
	 */
	private static function prefill_from_message( string $message, array $context ): array {
		$category = 'other';
		$lower    = strtolower( $message );

		$map = [
			'orders'   => [ 'order', 'tracking', 'delivery', 'damaged', 'missing' ],
			'shipping' => [ 'ship', 'shipping', 'courier' ],
			'returns'  => [ 'return' ],
			'refunds'  => [ 'refund', 'money back' ],
			'sellers'  => [ 'seller', 'vendor', 'store' ],
			'payments' => [ 'payment', 'card', 'charge' ],
			'accounts' => [ 'login', 'password', 'account' ],
		];

		foreach ( $map as $cat => $keywords ) {
			foreach ( $keywords as $word ) {
				if ( str_contains( $lower, $word ) ) {
					$category = $cat;
					break 2;
				}
			}
		}

		$subject = wp_trim_words( $message, 8, '…' );
		if ( strlen( $subject ) < 10 ) {
			$subject = __( 'Support request', 'dejoiy-support-center' );
		}

		return array_merge(
			[
				'subject'     => $subject,
				'category'    => $category,
				'description' => $message,
				'priority'    => '2 normal',
			],
			$context
		);
	}
}
