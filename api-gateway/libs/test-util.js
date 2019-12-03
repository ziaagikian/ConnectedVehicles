class TestUtil{
    shallowCopy(object){
        return JSON.parse(JSON.stringify(object))
    }
}

module.exports  = TestUtil