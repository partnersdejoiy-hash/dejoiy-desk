/**
 * JOI assistant hooks — extended behaviors loaded after portal.
 */
(function () {
  'use strict';
  document.addEventListener('dejoiy:joi-escalate', function (e) {
    if (window.dejoiySupport && e.detail?.prefill) {
      window.dejoiySupport._ticketPrefill = e.detail.prefill;
    }
  });
})();
