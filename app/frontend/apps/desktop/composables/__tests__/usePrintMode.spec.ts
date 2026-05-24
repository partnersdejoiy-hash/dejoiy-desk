// Copyright (C) 2024-2026 Dejoiy

import { usePrintMode } from '../usePrintMode.ts'

describe('usePrintMode', () => {
  it('supports printing current page', () => {
    const { printPage } = usePrintMode()

    Object.defineProperty(window, 'print', {
      value: vi.fn(),
    })

    printPage()

    expect(window.print).toHaveBeenCalledOnce()
  })

  it('supports toggling print mode', () => {
    const { turnOnPrintMode, turnOffPrintMode } = usePrintMode()

    expect(document.querySelector(':root')).not.toHaveAttribute('data-print-mode')

    turnOnPrintMode()

    expect(document.querySelector(':root')).toHaveAttribute('data-print-mode', 'true')

    turnOffPrintMode()

    expect(document.querySelector(':root')).not.toHaveAttribute('data-print-mode')
  })
})
