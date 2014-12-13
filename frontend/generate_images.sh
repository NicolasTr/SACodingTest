#!/bin/bash -e

cd vendor

copy() {
    mkdir -p ../app/images/vendor/$(dirname $1)
    if [[ $1 == ./images/chars/* ]]
    then
        echo "Converting $1"
        convert $1 -resize "220x220>" ../app/images/vendor/$1
    else
        echo "Copying $1"
        cp $1 ../app/images/vendor/$1
    fi
}
export -f copy


find . -type f | xargs -I {} bash -c "copy {}"
