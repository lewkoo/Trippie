# This script is designed to quickly install or update 
# required components for developing Trippie
# on a clean Mac OS X machine. 

echo "Welcome to Trippie OS X deployment script. This script will install all required software to start developing Trippie."
echo "Please, provide your sudo password so we don't have to stop anymore"

sudo su

echo "INSTALLING:  brew. Please watch the output as it will require your action."

# Install brew

ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"

echo "END INSTALLING: BREW. Moving on."

# Install node.js
# 

echo "INSTALLING: node.js & npm.  "

# Taken from: https://gist.github.com/isaacs/579814

echo 'export PATH=$HOME/local/bin:$PATH' >> ~/.bashrc
. ~/.bashrc
mkdir ~/local
mkdir ~/node-latest-install
cd ~/node-latest-install
curl http://nodejs.org/dist/node-latest.tar.gz | tar xz --strip-components=1
./configure --prefix=~/local
make install # ok, fine, this step probably takes more than 30 seconds...
curl https://npmjs.org/install.sh | sh

echo "END INSTALLING: node.js & npm. Moving on."


# Install MongoDB
# 
# this is where brew comes in handy
# 

echo "INSTALLING: mongoDB.  "

brew update

brew install mongodb

brew link mongodb

ln -sfv /usr/local/opt/mongodb/*.plist ~/Library/LaunchAgents

launchctl load ~/Library/LaunchAgents/homebrew.mxcl.mongodb.plist

echo "END INSTALLING: mongoDB. Moving on."

# Install packages for node
# 
# 
# 

echo "INSTALLING: bower.  "

sudo npm install -g bower

echo "END INSTALLING: bower. Moving on."


echo "INSTALLING: grunt.  "

sudo npm install -g grunt-cli

echo "END INSTALLING: grunt. Moving on."


# Clone MEAN, install
# 

cd $HOME

echo "CLONING: MEAN.  "

git clone https://github.com/linnovate/mean

echo "END CLONING: MEAN. Moving on."

cd mean

npm install

echo "STARTING SERVER. Make sure everything works."

grunt
