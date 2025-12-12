export function Loader(): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
      viewBox="0 0 24 24"
    >
      <path
        fill="none"
        stroke="#4481c3"
        strokeLinecap="round"
        strokeWidth="1"
        d="M12 6.99998C9.1747 6.99987 6.99997 9.24998 7 12C7.00003 14.55 9.02119 17 12 17C14.7712 17 17 14.75 17 12"
      >
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          dur="960ms"
          from="0,12,12"
          repeatCount="indefinite"
          to="360,12,12"
          type="rotate"
        />
      </path>
    </svg>
  );
}
