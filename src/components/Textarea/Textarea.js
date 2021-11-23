import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function Textarea(props) {
    const [wishlistText, setWishlistText] = useState(props.wishlistText ? props.wishlistText : "");

    return(
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>{props.name ? `${props.name}s önskelista` : "Din önskelista"}</Form.Label>
            <Form.Control as="textarea" rows={4} value={wishlistText} onChange={(e) => setWishlistText(e.target.value)} disabled={props.disabled} />
          </Form.Group>
          {!props.disabled && (
              props.isSaving ? (
                  <div className="alert alert-success mt-2" style={{display: props.isSaving ? 'block' : 'none' }} role="alert">
                      Sparar...
                  </div>
              ) :
                  <Button
                      className="btn-dark-blue"
                      type="button"
                      onClick={props.onSaveWishlist ? () => props.onSaveWishlist(wishlistText) : undefined}
                   >
                      Spara
                  </Button>
          )}
        </Form>
    )
}

export default Textarea