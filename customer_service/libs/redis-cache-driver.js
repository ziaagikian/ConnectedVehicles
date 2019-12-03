const helper =  require('./helper')
const  factory =  require('./redis-factory')

class RedisCacheDriver {
    constructor() {
    const dbUrl = helper.createDBUrl()
    this.redisClient = factory.createRedisClient(dbUrl);
    }
  
   /**
    * Get value
    * @param {*} key 
    */
    async get(key) {
      const res = await this.redisClient.getAsync(key);
      return res ;
    }

    /**
     * Store Values as  args in Hash specifed by  HashTable as  Key
     * @param {*} key HashTable 
     * @param  {...any} args List of Argument to be added
     */
     hmSet( key,...args){
      var argsArray = Array.prototype.slice.call(args);
        this.redisClient.hmset(key, argsArray, (err, reply)=> {
         if(err){
           console.error("Cannot seeding Data, Exiting Customer Service")
           system.exit(1)
         }
       });
    }

    /**
     * Get Value(s) from Hashtable based on input Ids
     * @param {*} tableName 
     * @param {*} hashIDs 
     */
    async hmGet(tableName, hashIDs){
      const res = await this.redisClient.hmgetAsync(tableName,hashIDs);
      return res
    }

  
    /**
     * store Value based key
     * @param {*} key 
     * @param {*} value 
     * @param {*} expiration in Seconds
     */
    setex(key, value, expiration) {
      return this.redisClient.setAsync(key, JSON.stringify(value), 'EX', expiration);
    }

    /**
     * store Value based key
     * @param {*} key 
     * @param {*} value 
     */
    set(key, value) {
        return this.redisClient.setAsync(key, JSON.stringify(value));
      }
    
    /**
     * Remove  value  of given key
     * @param {*} key 
     */
    remove(key) {
      return this.redisClient.delAsync(key);
    }
  
    /**
     * Quit Redis Client
     */
    quit(){
      return this.redisClient.quit()
    }
  }
  
  module.exports = RedisCacheDriver;