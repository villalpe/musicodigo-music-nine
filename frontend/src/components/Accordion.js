import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap'
import accordion from '../accordion';
import AccordionList from './AccordionList';

function Accordion() {

    const [toggle, setToggle] = useState(null);
    let handleToggle=(id)=>{
        if(toggle===id){
            setToggle(null);
            return false
        }
       setToggle(id)
       
    }

  return (
        <Row>
            <Col className="sm-4">
              <AccordionList accordionData={accordion} handleToggle={handleToggle} toggle={toggle} />
            </Col>
        </Row>
  )
}

export default Accordion