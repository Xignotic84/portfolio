export function LogoMark({ size, rounded = true }: { size: number; rounded?: boolean }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: rounded ? size * 0.22 : 0,
        background: "#131313",
        color: "#f4f4f4",
        fontFamily: "Geist",
        fontWeight: 600,
        fontSize: size * 0.48,
        letterSpacing: size * -0.03,
        paddingBottom: size * 0.04,
      }}
    >
      fh
    </div>
  );
}
