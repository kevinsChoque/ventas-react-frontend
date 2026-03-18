const FullScreenLoader = ({show}) => {
  if (!show) return null;
  const styles = {
      overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      },
      loader: {
        width: "60px",
        height: "60px",
        border: "6px solid #f3f3f3",
        borderTop: "6px solid #3498db",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
      },
    }
  return (
    <div style={styles.overlay}>
      <div style={styles.loader}></div>  
    </div>
  );
  
};
export default FullScreenLoader;