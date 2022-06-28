import { Button, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import ModalEditProduct from "../../../components/ModalEditProduct";

const DetailProduct = () => {
  const router = useRouter();
  const { id } = router.query;

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div>
        <Button variant="outlineCustom" onClick={onOpen}>
          Edit
        </Button>
        <ModalEditProduct isOpen={isOpen} onClose={onClose} id={id} />
      </div>
    </>
  );
};

export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default DetailProduct;
