#!/bin/bash
export CVSROOT=:ext:sense@192.168.0.100:/media/sense/469B5AFF63D8DFF5/Iot
#cvs import -m "include closure library module" frontend/closure-library Closure_library start
#cvs add frontend/
cvs import -m "include the main blockly directory root" frontend/google_blockly_old Google_Blockly start
