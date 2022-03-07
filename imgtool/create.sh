#!/bin/sh

cd /mnt/imgtool

rm os.img
dd if=/dev/zero of=os.img bs=32K count=1024
dd conv=notrunc if=clean_fat.img of=os.img

# C=count/16.2
# LBA=count*63.590625=count*32*1024/512

# Cylinder -> 1 byte at 0x1c5
printf '\3e' | dd of=os.img bs=1 seek=453 count=1 conv=notrunc
# LBA -> 4 bytes at 0x1cA, 4 bytes at 0x7e20
printf '\x00\x00\x01\x00' | dd of=os.img bs=1 seek=458 count=4 conv=notrunc
printf '\x00\x00\x01\x00' | dd of=os.img bs=1 seek=32288 count=4 conv=notrunc
# Sectors per FAT -> 1 byte at 0x1cA (0x64 or 0x48)
printf '\x64' | dd of=os.img bs=1 seek=32278 count=4 conv=notrunc

# 1156 = C 71, LBA 73521
# 1600 = C 99, LBA 101745

# 1600/99=1156/71
# C=~16.2x

# 101745/1600=73521/1156
# LBA=0.01572

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
