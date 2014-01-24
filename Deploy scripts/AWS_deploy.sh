# This script is designed to quickly install or update 
# required components for developing Trippie
# on a clean AWS machine. 


function pause(){
   read -p "$*"
}


echo "Welcome to Trippie AWS deployment script. This script will install all required software to start developing Trippie."
echo "Please, provide your sudo password so we don't have to stop anymore"


sudo yum -y update

sudo yum -y install gcc-c++
sudo yum -y install openssl-devel
sudo yum -y install make

sudo yum -y install git-core



cd $HOME
git clone git://github.com/joyent/node.git

# Install node.js
# 

clear

echo "INSTALLING: node.js & npm. This will take a while"

# Taken from: https://gist.github.com/isaacs/579814

cd node
./configure 
sudo make
sudo make install

sudo yum -y install curl

#sudo chown -R $USER /home/ec2-user/local #Change nodejs folder permissions
sudo curl https://npmjs.org/install.sh | sudo sh
npm install express
npm ls installed #See what npm packages are installed

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

npm install -g bower

echo "END INSTALLING: bower. Moving on."


echo "INSTALLING: grunt.  "

npm install -g grunt-cli

echo "END INSTALLING: grunt. Moving on."


# Clone MEAN, install
# 

cd $HOME

echo "CLONING: MEAN.  "

git clone https://github.com/linnovate/mean

echo "END CLONING: MEAN. Moving on."

cd mean

npm install


