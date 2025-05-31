import FormCertificate from "../components/FormCertificate";

const ViewProducers = () => {
  return (
    <>
      <div>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-medium mb-4">Bienvenido/a Usuario.</h1>
          <p className="text-black">
            Emití el certificado de autenticidad de tu producto sostenible en
            segundos.
          </p>
        </div>
        <FormCertificate />
      </div>
    </>
  );
};

export default ViewProducers;
