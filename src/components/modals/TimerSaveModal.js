import { Modal } from "react-bootstrap";
function TimerSaveModal(props) {
  return (
    <Modal show={props.show} className={props.className} dialogClassName="modal-370w">
      <Modal.Header className="modal-header">
        <Modal.Title className="fw-normal fs-2 my-2">{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">{props.body}</Modal.Body>
      <Modal.Footer className="modal-footer">
      </Modal.Footer>
    </Modal>
  );
}

export default TimerSaveModal;