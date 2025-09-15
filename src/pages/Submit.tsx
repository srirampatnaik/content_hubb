import { motion } from 'framer-motion';
import ContentSubmissionForm from '@/components/forms/ContentSubmissionForm';

const Submit = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-8"
    >
      <ContentSubmissionForm />
    </motion.div>
  );
};

export default Submit;