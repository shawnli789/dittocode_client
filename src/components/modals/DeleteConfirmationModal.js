import { Button, Modal } from "react-bootstrap";
function DeleteConfirmationModal(props) {
  return (
    <Modal show={props.show} onHide={props.handleClose} className="pt-8" dialogClassName="modal-480w">
    <Modal.Header closeButton className="modal-header">
      <Modal.Title className="fw-normal fs-2 my-2">{props.title}</Modal.Title>
    </Modal.Header>
    <Modal.Body className="modal-body">{props.body}</Modal.Body>
    <Modal.Footer className="modal-footer">
      <Button variant="secondary" onClick={props.handleClose}>
        Cancel
      </Button>
      <Button variant="danger" onClick={props.deleteHandler}>
        Delete <span className="fe fe-trash" />
      </Button>
    </Modal.Footer>
  </Modal>
  );

}

export default DeleteConfirmationModal;