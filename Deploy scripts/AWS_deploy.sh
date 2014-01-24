# This script is designed to quickly install or update 
# required components for developing Trippie
# on a clean AWS machine. 


function pause(){
   read -p "$*"
}


echo "Welcome to Trippie AWS deployment script. This script will install all required software to start developing Trippie."
echo "Please, provide your sudo password so we don't have to stop anymore"


sudo yum -y update

sudo yum install openssl openssl-devel
sudo yum groupinstall "Development Tools"

sudo yum install git-core
git clone git://github.com/joyent/node.git

# Install node.js
# 

clear

echo "INSTALLING: node.js & npm. This will take a while"

# Taken from: https://gist.github.com/isaacs/579814

cd node
./configure
make

sudo make install
node -v # see the version of node

sudo yum install curl

sudo su
PATH=$PATH:/home/ec2-user/node
export PATH
curl http://npmjs.org/install.sh | sh
exit

echo "END INSTALLING: node.js & npm. Moving on."

pause 'Press [Enter] key to continue...'

clear



# Install MongoDB
# 
# this is where brew comes in handy
# 

echo "INSTALLING: mongoDB.  "

echo "[MongoDB]
name=MongoDB Repository
baseurl=http://downloads-distro.mongodb.org/repo/redhat/os/x86_64
gpgcheck=0
enabled=1" | sudo tee -a /etc/yum.repos.d/mongodb.repo

sudo yum install -y mongo-10gen-server

echo "END INSTALLING: mongoDB. Moving on."

pause 'Press [Enter] key to continue...'

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

sudo npm install


