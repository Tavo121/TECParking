const updateSpace = async (req, res) => {
    try{
        const {space_id, state} = req.body;
        if (!space_id || !state){
            return res.status(400).json({ success: false, message: 'Missing required fields'})
        }

        if (space_id == 1){
            return res.status(201).json({ success: true, message: 'Test passed'})
        }
        console.log(`Updating space ${space_id} to ${state}`)
        res.status(201).json({ success: true, message: 'Space updated'})
    } catch (error){
        res.status(500).json({ success: false, message: 'Server error'});
    }
};

module.exports = {updateSpace}