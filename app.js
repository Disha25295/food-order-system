const express = require("express");
const app = express();
const bodyparser = require("body-parser");

const port = process.env.PORT || 3200;

//middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

app.listen(port, ()=> {
    console.log(`running at port ${port}`);
});

const orders = [];

//post
app.post("/new_orders", (req, res) => {
    const order = req.body

    if(order.food_name && order.customer_name && order.food_qty) {
        order.push({
            ...order,

            id: `${order.length+1}`,
            date : Date.now().toString()
        });
        res.status(200).json({
            message: "order created successfully"
        });
    }
    else {
        res.status(401).json({
            message: "Order not created"
        });
    }
});

//get
app.get("/get_order", (req, res) => {
    res.status(200).send(orders);
});

//patch for update
app.patch("/order/:id", (req, res) => {
    const order_id= req.params.id;

    const order_update = req.body;
    
    for(let order of orders) {
        if(order.id == order_id) {
            if(order_update.food_name != null || undefined)
            order.food_name = order_update.food_name;
        
            if(order_update.customer_name != null || undefined)
            order.customer_name = order_update.customer_name;

            if (order_update.food_qty != null || undefined)
            order.food_qty = order_update.food_qty;

            return res
            .status(200)
            .json({message : "updated successfully", data : order});
        }
    }
    res.status(404).json({message : "invalid order ID"});
});

//Deleting
app.delete("/order/:id", (req, res) =>{
    const order_id = re.params.id;

    for(let order of orders) {
        if(order.id == order_id) {
            orders.splice(orders.IndexOf(order), 1);

            return res.status(200).json({
                message: "Deleted Successfully"
            });
        }
    }
    res.status(404).json({
        message: "Invalid ID"
    });
})
