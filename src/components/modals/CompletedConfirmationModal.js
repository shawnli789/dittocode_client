import { Button, Modal } from "react-bootstrap";
function CompletedConfirmationModal(props) {
  return (
    <Modal show={props.show} onHide={props.handleClose} backdrop="static" className={props.className} dialogClassName="modal-370w">
      <Modal.Header closeButton closeVariant='white' className="modal-header">
        <Modal.Title className="fw-normal fs-2 my-2">{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">{props.body}</Modal.Body>
      <Modal.Footer className="modal-footer">
        <Button variant="danger" onClick={props.failHandler}>
          No
        </Button>
        <Button variant="success" onClick={props.successHandler}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );

}

export default CompletedConfirmationModal;