import React, { Component } from 'react';
import { PaystackButton } from 'react-paystack';
import { Dialog, DialogActions, DialogTitle } from '@material-ui/core';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';

class DialogBox extends Component {

    componentProps = {
        reference: (new Date()).getTime(),
        email: '',
        amount: 0,
        publicKey: process.env.REACT_APP_PAY_STACK,
        text: 'Make Payment Now',
        onSuccess: () => null,
        onClose: () => null
    }

    render() {
        this.componentProps.email = this.props.email;
        this.componentProps.amount = this.props.total * 100;
        return (
            <div>
                <Dialog open={this.props.switch} fullScreen = {false} scroll='body'>
                    <CloseIcon onClick={this.props.close} style={{width: 50, height:50}}/>
                    <DialogTitle>Purchase Summary</DialogTitle>
                    <DialogActions>
                        <div className='container'>
                            <Table className='MuiTable-root'>
                                <TableHead className='MuiTableRow-head'>
                                    <TableRow style={{ backgroundColor: '#80afbc' }}>
                                        <TableCell>Product</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Qty</TableCell>
                                        <TableCell>No of orders</TableCell>
                                        <TableCell>Sum</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.props.orders.map(order =>
                                        <TableRow key={order.key} className='MuiTableRow-hover'>
                                            <TableCell>{order.name}</TableCell>
                                            <TableCell>#{order.price}</TableCell>
                                            <TableCell>{order.quantity}</TableCell>
                                            <TableCell>{order.orders}</TableCell>
                                            <TableCell>#{order.total}</TableCell>
                                            <TableCell role='button'>
                                                <DeleteIcon onClick={() => {this.props.delete(order.user_id, order.product_id, 
                                                                                            document.getElementById('spinner'))}}/>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table><br />
                            <div id='spinner' className="spinner-border text-danger" role="status" style={this.sty}>
                                <span className="sr-only">loading...</span>
                            </div>&nbsp;&nbsp;<br/>
                            <p>{`Total =#${this.props.total}`}</p>
                            <PaystackButton {...this.componentProps} className='btn btn-secondary'/>
                        </div><br />
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    sty = {
        display: 'none',
        position: 'relative',
        top: -300,
        left: 220
    }
}

export default DialogBox;