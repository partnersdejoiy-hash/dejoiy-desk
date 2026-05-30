<?php
/**
 * DEJOIY Internal Tools (Zammad) REST API client.
 *
 * @package DejoiySupportCenter
 */

defined( 'ABSPATH' ) || exit;

class Dejoiy_SC_Zammad_Api {

	private string $base_url;
	private string $token;
	private int $timeout;

	public function __construct( ?string $base_url = null, ?string $token = null ) {
		$this->base_url = rtrim( $base_url ?? (string) get_option( 'dejoiy_sc_zammad_url', '' ), '/' );
		$this->token    = $token ?? (string) get_option( 'dejoiy_sc_zammad_token', '' );
		$this->timeout  = (int) apply_filters( 'dejoiy_sc_api_timeout', 30 );
	}

	public function is_configured(): bool {
		return '' !== $this->base_url && '' !== $this->token;
	}

	/**
	 * @param array<string,mixed> $query
	 * @return array<string,mixed>|array<int,mixed>|WP_Error
	 */
	public function get( string $path, array $query = [] ) {
		return $this->request( 'GET', $path, $query );
	}

	/**
	 * @param array<string,mixed> $body
	 * @return array<string,mixed>|array<int,mixed>|WP_Error
	 */
	public function post( string $path, array $body = [] ) {
		return $this->request( 'POST', $path, [], $body );
	}

	/**
	 * @param array<string,mixed> $body
	 * @return array<string,mixed>|array<int,mixed>|WP_Error
	 */
	public function put( string $path, array $body = [] ) {
		return $this->request( 'PUT', $path, [], $body );
	}

	/**
	 * @param array<string,mixed> $query
	 * @param array<string,mixed> $body
	 * @return array<string,mixed>|array<int,mixed>|WP_Error
	 */
	public function request( string $method, string $path, array $query = [], array $body = [] ) {
		if ( ! $this->is_configured() ) {
			return new WP_Error( 'dejoiy_sc_not_configured', __( 'Support desk API is not configured.', 'dejoiy-support-center' ) );
		}

		$url = $this->base_url . '/api/v1/' . ltrim( $path, '/' );

		if ( $query ) {
			$url = add_query_arg( $query, $url );
		}

		$args = [
			'method'  => $method,
			'timeout' => $this->timeout,
			'headers' => [
				'Authorization' => 'Token token=' . $this->token,
				'Content-Type'    => 'application/json',
				'Accept'          => 'application/json',
			],
		];

		if ( $body ) {
			$args['body'] = wp_json_encode( $body );
		}

		$response = wp_remote_request( $url, $args );

		if ( is_wp_error( $response ) ) {
			return $response;
		}

		$code = wp_remote_retrieve_response_code( $response );
		$raw  = wp_remote_retrieve_body( $response );
		$data = json_decode( $raw, true );

		if ( $code >= 400 ) {
			$message = is_array( $data ) && isset( $data['error'] )
				? (string) $data['error']
				: ( is_array( $data ) && isset( $data['error_human'] ) ? (string) $data['error_human'] : $raw );

			return new WP_Error(
				'dejoiy_sc_api_error',
				$message ?: sprintf( __( 'API error (HTTP %d)', 'dejoiy-support-center' ), $code ),
				[ 'status' => $code, 'body' => $data ]
			);
		}

		return is_array( $data ) ? $data : [];
	}

	/**
	 * Search users by email.
	 *
	 * @return array<string,mixed>|WP_Error
	 */
	public function find_user_by_email( string $email ) {
		$result = $this->get(
			'users/search',
			[
				'query' => $email,
				'limit' => 5,
			]
		);

		if ( is_wp_error( $result ) ) {
			return $result;
		}

		if ( ! is_array( $result ) ) {
			return new WP_Error( 'dejoiy_sc_invalid_response', __( 'Invalid user search response.', 'dejoiy-support-center' ) );
		}

		foreach ( $result as $user ) {
			if ( ! is_array( $user ) ) {
				continue;
			}
			if ( isset( $user['email'] ) && strcasecmp( (string) $user['email'], $email ) === 0 ) {
				return $user;
			}
		}

		return new WP_Error( 'dejoiy_sc_user_not_found', __( 'Zammad user not found.', 'dejoiy-support-center' ) );
	}

	/**
	 * @param array<string,mixed> $payload
	 * @return array<string,mixed>|WP_Error
	 */
	public function create_user( array $payload ) {
		$created = $this->post( 'users', $payload );
		return $created;
	}
}
