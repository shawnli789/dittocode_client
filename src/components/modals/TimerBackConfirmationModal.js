import { Button, Modal } from "react-bootstrap";
function TimerBackConfirmationModal(props) {
  return (
    <Modal show={props.show} onHide={props.handleClose} className={props.className} dialogClassName="modal-370w">
      <Modal.Header closeButton closeVariant='white' className="modal-header">
        <Modal.Title className="fw-normal fs-2 my-2">{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">{props.body}</Modal.Body>
      <Modal.Footer className="modal-footer">
        <Button variant="secondary" onClick={props.handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={props.actionHandler}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );

}

export default TimerBackConfirmationModal;