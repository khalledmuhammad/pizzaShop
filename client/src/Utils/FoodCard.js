import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Button
} from '@mui/material';

const FoodCard = ({product}) => {

    return(
        <Card>
            
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    { product.title}
                </Typography>
                <Typography variant="body2" component="p">
                   { product.desc }
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                
                <Button size="small" color="primary" component={RouterLink} to={`/product/${product._id}`}>
                    View product
                </Button>
            </CardActions>
            
        </Card>
    )
}


export default FoodCard;