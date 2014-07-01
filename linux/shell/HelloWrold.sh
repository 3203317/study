#!/bin/bash
echo "Hello World!"

libFolder=/usr/lib/jdk

echo $libFolder

if [ ! -d  $libFolder ]; then
	mkdir $libFolder
else
	echo "exist:" $libFolder
fi

#cp ~/Nutstore/software/jdk-7u60-linux-x64.tar.gz /usr/lib/jdk/
#tar -zxvg jdk-7u60-linux-x64.tar.gz

tar -zxvf ~/Nutstore/software/jdk-7u60-linux-x64.tar.gz -C /usr/lib/jdk/