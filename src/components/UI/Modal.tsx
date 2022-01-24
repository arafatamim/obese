import { motion } from "framer-motion";
import { PlainButton } from "./Button";
import styles from "./Modal.module.scss";

const Backdrop = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <motion.div
      onClick={onClick}
      className={styles.backdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      {children}
    </motion.div>
  );
};

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    opacity: 0,
  },
};

const Modal = ({
  handleClose,
  children,
}: {
  handleClose: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Backdrop>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className={styles.modal}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit">
        {children}
        <PlainButton onClick={() => handleClose()}>Close</PlainButton>
      </motion.div>
    </Backdrop>
  );
};

export default Modal;
