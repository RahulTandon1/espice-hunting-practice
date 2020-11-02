const Level = require("./levelModel");
const _ = require('lodash');

createLevel = async (name, author, text, answer) => {
    try {
        const level = new Level ({
            name: name,
            author: author, 
            levelText: text,
            answer: answer
        });
        
        const result = await level.save();
        return result;
    }
    catch(err) {
        console.log("Error while making level for DB", err)
    }
},

addEndpoint =  async (objID) => {
    try{
        let lvl = await Level.findOneAndUpdate(
            {_id : objID},     // filter
            { endpoint: String(objID).slice(-4)},   // update 
            {new: true}
        )    // returns updated object
        return lvl.endpoint
    }
    catch (err) {
        console.log("Error while adding Endpoint")
    }
},


getAllLevels = async () => {
    try {
        let levels = await Level
        .find()
        .limit(15)
        .sort({ date: 1})
        .select({ name: 1, author: 1, levelText:1 });
    
        levels.forEach( (level, index, levelsArr) => {
            return levelsArr[index] = _.pick(level, ['_id','name', 'author', 'levelText'])
        })
        return levels;
    }
    catch (err) {
        console.error(err);
    }
}    


module.exports.createLevel=createLevel;
module.exports.addEndpoint=addEndpoint;
module.exports.getAllLevels=getAllLevels;