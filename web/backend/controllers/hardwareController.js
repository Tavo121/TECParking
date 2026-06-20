const updateSpace = async (req, res) => {
    try{
        const {space_id, state} = req.body;
        if (!space_id){
            return res.status(400).json({ success: false, message: 'Missing required fields'})
        }
        console.log(`Updating space ${space_id} to ${state}`)
        
        // Emitir evento a todos los clientes conectados
        if (req.app.io) {
            req.app.io.emit('spaceUpdated', {
                space_id: space_id,
                state: state,
                timestamp: new Date().toISOString()
            });
        }
        
        res.status(201).json({ success: true, message: 'Space updated'})
    } catch (error){
        console.error('Error updating space:', error);
        res.status(500).json({ success: false, message: 'Server error'});
    }
};

module.exports = {updateSpace}