echo "Hello and welcome to daily deploy script. Designed to update the repo, build and deploy Trippie daily, 
this script should ensure the a given server runs the most-up-to-date version of Trippie. "
echo "This script can also be executed for quick deployment on Amazon AWS"

#kill all screen sessions, take the server and the db down
screen -ls | tail -n +2 | head -n -2 | awk '{print $1}'| xargs -I{} screen -S {} -X quit

#remove the DB file, clear the DB
sudo rm -rf /data/db/mongod.lock

#cd .. #move back one directory
git pull --ff --all  #ensure only fast-forward, fetch all branches (because why not?)

#start up the DB
screen -dmS database
screen -S database -X stuff 'sudo mongod^M'

sleep 60 #wait for 30 seconds for the DB to load and initialize itself

#start up the Grunt with development settings to make it faster
screen -dmS server
screen -S server -p 0 -X stuff 'NODE_ENV=production grunt^M'
