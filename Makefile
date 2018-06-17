VIRTUALENV = .venv/aws
INSTALL = pip install -e .
ACTIVATE = $(VIRTUALENV)/bin/activate
AWS_CONFIG_FILE = .aws
NUM_INSTANCES = 1
REGION = 'us-east-1'
TEMPLATE_ID = 'aws-test'

# ami ami-9887c6e7


# Create var for the environment variables used by wdio
ENV_VARS = NUM_INSTANCES=$(NUM_INSTANCES)  \
	TEMPLATE_ID=$(TEMPLATE_ID) \
	REGION=$(REGION) \
	AWS_CONFIG_FILE=$(AWS_CONFIG_FILE) \

# If a virtualenv is not already existing, create it
venv-setup:
	test -d "$(VIRTUALENV)" || virtualenv -p `which python3` "$(VIRTUALENV)"

# Activate the virtualenv an install the dependencies
devbuild: venv-setup
	. $(ACTIVATE) && $(INSTALL) -q
	@echo "Run '. .venv/load/bin/activate' to enter the virtualenv"

# Run controller scripts to start/stop instances
start-instances: devbuild
	. $(ACTIVATE) && $(ENV_VARS) python aws/start_instances.py

stop-instances: devbuild
	. $(ACTIVATE) && $(ENV_VARS) python aws/stop_instances.py