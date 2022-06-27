function loadPageEntry(dword_entry: number, pae: boolean, is_directory: boolean) {
  if (!(dword_entry & 1)) {
    // present bit not set
    return false;
  }

  const size = (dword_entry & 128) === 128;
  let address = 0;

  if (size && !is_directory) {
    address = dword_entry & (pae ? 0xffe00000 : 0xffc00000);
  } else {
    address = dword_entry & 0xfffff000;
  }

  return {
    size: size,
    global: (dword_entry & 256) === 256,
    accessed: (dword_entry & 0x20) === 0x20,
    dirty: (dword_entry & 0x40) === 0x40,
    cache_disable: (dword_entry & 16) === 16,
    user: (dword_entry & 4) === 4,
    read_write: (dword_entry & 2) === 2,
    address: address >>> 0,
  };
}

export function getPageDirectory(cpu: any, pd_addr = cpu.cr[3], pae = false, start = 0) {
  const n = pae ? 512 : 1024;
  const entry_size = pae ? 8 : 4;
  const pd_shift = pae ? 21 : 22;

  const output: { virt: number; phys: number }[] = [];

  for (let i = 0; i < n; i++) {
    const addr = pd_addr + i * entry_size;
    let dword = cpu.read32s(addr);
    const entry = loadPageEntry(dword, pae, true);

    if (!entry) {
      continue;
    }

    if (entry.size) {
      const virt = (start + (i << pd_shift)) >>> 0;
      const phys = entry.address;
      output.push({ virt, phys });
      continue;
    }

    for (let j = 0; j < n; j++) {
      const sub_addr = entry.address + j * entry_size;
      dword = cpu.read32s(sub_addr);

      const subentry = loadPageEntry(dword, pae, false);

      if (subentry) {
        const virt = (start + ((i << pd_shift) | (j << 12))) >>> 0;
        const phys = subentry.address;
        output.push({ virt, phys });
      }
    }
  }

  return output;
}

export function translateVirtualToPhysical(address: number, cpu: any) {
  const pages = getPageDirectory(cpu);
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    const lower = address ^ page.virt;
    if (lower <= 0xfff) {
      return page.phys | lower;
    }
  }
  return address;
}
