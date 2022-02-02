#!/bin/sh

cd /mnt/imgtool

rm os.img
dd if=/dev/zero of=os.img bs=32K count=1600
dd conv=notrunc if=clean_fat.img of=os.img

# dd conv=notrunc if=mbr.img of=os.img
# (
# echo o # Create a new empty DOS partition table
# echo n # Add a new partition
# echo p # Primary partition
# echo 1 # Partition number
# echo   # First sector (Accept default: 1)
# echo   # Last sector (Accept default: varies)
# echo a # Toggle bootable
# echo 1 # Partition number
# echo w # Write changes
# ) | fdisk -H 16 -S 63 os.img
# printf '\x0e' | dd of=os.img bs=1 seek=450 count=1 conv=notrunc 

# mkfs.fat -F 16 -g 16/63 --offset 63 os.img
# mformat -h 16 -s 63 -H 0 -c 4 -i "os.img@@32256" ::
# dd conv=notrunc if=part_boot.img of=os.img obs=1 seek=32318

for f in ../filesystem95/*;
do
  mcopy -i os.img@@32256 -s "$f" ::/;
done

# mcopy -i os.img@@32256 ::/WINDOWS/SYSTEM.DAT ../filesystem95/WINDOWS/SYSTEM.DAT
# mcopy -i os.img@@32256 ::/WINDOWS/USER.DAT ../filesystem95/WINDOWS/USER.DAT
