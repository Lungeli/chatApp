export const sendMessage = async(req, res) => {
    try {
        const {message} = req.body;
        const {id} = req.params;
        const senderId = req.userId;
        
    } catch (error) {
        console.log("Error in Send Message Controller: ", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}