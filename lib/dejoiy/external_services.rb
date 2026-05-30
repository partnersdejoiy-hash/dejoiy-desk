# Copyright (C) 2024-2026 Dejoiy

module Dejoiy
  # Controls whether legacy upstream-hosted services may be contacted.
  # DEJOIY internal deployments keep these disabled by default so no data
  # is sent to third-party vendor infrastructure.
  module ExternalServices
    module_function

    def zammad_vendor_enabled?
      ActiveModel::Type::Boolean.new.cast(
        ENV.fetch('DEJOIY_ENABLE_VENDOR_SERVICES', 'false')
      )
    end
  end
end
