#!/bin/sh

cd /mnt/tools/imgtool

rm os-reg.img
dd if=/dev/zero of=os-reg.img bs=32K count=1024
dd conv=notrunc if=fat.img of=os-reg.img

# Cylinder -> 1 byte at 0x1c5
printf '\3e' | dd of=os-reg.img bs=1 seek=453 count=1 conv=notrunc
# LBA -> 4 bytes at 0x1cA, 4 bytes at 0x7e20
printf '\x00\x00\x01\x00' | dd of=os-reg.img bs=1 seek=458 count=4 conv=notrunc
printf '\x00\x00\x01\x00' | dd of=os-reg.img bs=1 seek=32288 count=4 conv=notrunc
# Sectors per FAT -> 1 byte at 0x1cA (0x64 or 0x48)
printf '\x64' | dd of=os-reg.img bs=1 seek=32278 count=4 conv=notrunc

for f in ../../win-runtime/filesystem-reg/*;
do
  mcopy -i os-reg.img@@32256 -s "$f" ::/;
done

qemu-system-i386 -hda os-reg.img

mcopy -i os-reg.img@@32256 ::/WINDOWS/SYSTEM.DAT ../../win-runtime/filesystem/WINDOWS/SYSTEM.DAT
mcopy -i os-reg.img@@32256 ::/WINDOWS/USER.DAT ../../win-runtime/filesystem/WINDOWS/USER.DAT
# mcopy -i os-reg.img@@32256 ::/VMM32.VXD ../../win-runtime/filesystem/WINDOWS/SYSTEM/VMM32.VXD

rm os-reg.img
