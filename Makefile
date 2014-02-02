THIS_MAKEFILE := $(abspath $(lastword $(MAKEFILE_LIST)))
NACL_SDK_ROOT ?= $(abspath $(dir $(THIS_MAKEFILE))../../nacl_sdk/pepper_32)

WARNINGS := -Wno-long-long -Wall -Wswitch-enum -pedantic -Werror
CFLAGS   := -pthread -std=c99 $(WARNINGS)
CXXFLAGS := -pthread -std=gnu++98 $(WARNINGS)

GETOS     := python $(NACL_SDK_ROOT)/tools/getos.py
OSNAME    := $(shell $(GETOS))

PNACL_TC_PATH  := $(NACL_SDK_ROOT)/toolchain/$(OSNAME)_pnacl

PNACL_CXX      := $(PNACL_TC_PATH)/bin/pnacl-clang++
PNACL_C        := $(PNACL_TC_PATH)/bin/pnacl-clang

PNACL_FINALIZE := $(PNACL_TC_PATH)/bin/pnacl-finalize

CXXFLAGS       := -I$(NACL_SDK_ROOT)/include
CFLAGS         := -I$(NACL_SDK_ROOT)/include

LDFLAGS        := -L$(NACL_SDK_ROOT)/lib/pnacl/Debug -lppapi_cpp -lppapi

all: hello_tutorial.pexe

hello_tutorial.bc: hello_tutorial.cc
	$(PNACL_CXX) -o $@ $< -O2 $(CXXFLAGS) $(LDFLAGS)

hello_tutorial.pexe: hello_tutorial.bc
	$(PNACL_FINALIZE) -o $@ $<

clean:
	$(RM) hello_tutorial.pexe hello_tutorial.bc

echo:
	@echo "NACL_SDK_ROOT:\t  $(NACL_SDK_ROOT)"
	@echo "PNACL_TC_PATH:\t $(PNACL_TC_PATH)"
	@echo "OSNAME:\t  $(OSNAME)"
	@echo "RM:\t  $(RM)"
	@echo "PNACL_CXX:\t  $(PNACL_CXX)"
	@echo "PNACL_C:\t  $(PNACL_C)"
	@echo "PNACL_FINALIZE:\t  $(PNACL_FINALIZE)"
	@echo "CXXFLAGS:\t  $(CXXFLAGS)"
	@echo "CFLAGS:\t  $(CFLAGS)"
	@echo "LDFLAGS:\t  $(LDFLAGS)"
	
