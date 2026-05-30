# Copyright (C) 2012-2026 Zammad Foundation, https://zammad-foundation.org/

class AI::Provider::ZammadAI < AI::Provider
  # No vendor default — configure DEJOIY_AI_API_URL for internal AI gateway only.
  DEJOIY_AI_API_BASE_URL = ''.freeze

  def chat(prompt_system:, prompt_user:, prompt_image:)
    raise Exceptions::UnprocessableContent, __('AI service is not configured. Set DEJOIY_AI_API_URL and DEJOIY_AI_TOKEN.') if !self.class.configured?(config)

    service_name = options[:service_name] || 'generic'

    request_body = {
      system_prompt: prompt_system,
      prompt:        prompt_user,
    }

    if options[:model]
      request_body[:llm] = options[:model]
    end

    if prompt_image.is_a?(::Store)
      request_body[:images] = [Base64.strict_encode64(prompt_image.content_ocr)]
    end

    response = UserAgent.post(
      "#{self.class.base_url(config)}/api/v1/features/#{service_name.underscore}",
      request_body,
      {
        open_timeout:  4,
        read_timeout:  60,
        verify_ssl:    true,
        bearer_token:  self.class.token(config),
        total_timeout: 60,
        json:          true,
        log:           {
          facility: 'AI::Provider',
        },
      },
    )

    data = validate_response!(response)
    extract_response_metadata(data)

    data.first['response']
  end

  def embeddings(input:)
    raise NotImplementedError, 'not implemented yet due to missing API'
  end

  def self.ping!(config)
    response = UserAgent.get(
      "#{base_url(config)}/api/v1/me",
      {},
      {
        open_timeout:  4,
        read_timeout:  60,
        verify_ssl:    true,
        bearer_token:  token(config),
        total_timeout: 60,
        json:          true,
        log:           {
          facility:          'AI::Provider',
          log_only_on_error: true,
        },
      },
    )

    validate_response!(response)

    nil
  end

  def self.base_url(config)
    ENV['DEJOIY_AI_API_URL'] || ENV['ZAMMAD_AI_API_URL'] || config[:url].presence || DEJOIY_AI_API_BASE_URL
  end

  def self.token(config)
    ENV['DEJOIY_AI_TOKEN'] || ENV['ZAMMAD_AI_TOKEN'] || config[:token]
  end

  def self.configured?(config)
    base_url(config).present? && token(config).present?
  end

  private

  def extract_response_metadata(data)
    @response_metadata = {
      model:             data.first['model'],
      prompt_tokens:     data.first.dig('usage', 'prompt_tokens'),
      completion_tokens: data.first.dig('usage', 'completion_tokens'),
      total_tokens:      data.first.dig('usage', 'total_tokens'),
    }
  end
end
