#!/bin/bash
echo "Close mongodb!"

~/mongodb/mongodb-linux-x86_64-2.6.3/bin/mongo admin --eval "db.shutdownServer()"