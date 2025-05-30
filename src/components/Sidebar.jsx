import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  return (
    <aside className="bg-sidebar max-w-[100px] flex flex-col items-center justify-between py-8">
      <svg
        width="22"
        height="21"
        viewBox="0 0 22 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="11" cy="10.5" r="10.5" fill="black" />
        <path
          d="M8.49786 7.25188C12.135 9.65692 14.3738 10.4866 18.62 11.3106M6.26772 5.88699C9.00224 10.891 9.91035 13.4628 9.97912 17.4703"
          stroke="white"
          strokeWidth="0.5"
        />
      </svg>

      <div className="flex flex-col gap-8">
        <NavLink to="/Producers">
          {({ isActive }) => (
            <svg
              width="26"
              height="24"
              viewBox="0 0 26 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.4545 21.8V10.3333L24.1851 10.2128C20.1007 8.3822 16.694 5.36331 14.4302 1.56853L14.0909 1H11.9091L11.5698 1.56853C9.30603 5.36331 5.89926 8.3822 1.81491 10.2128L1.54545 10.3333V21.8M25 23.4H1M16.2727 21.8V17.5333C16.2727 16.6846 15.9279 15.8707 15.3142 15.2706C14.7004 14.6705 13.868 14.3333 13 14.3333C12.132 14.3333 11.2996 14.6705 10.6858 15.2706C10.0721 15.8707 9.72727 16.6846 9.72727 17.5333V21.8"
                stroke={isActive ? "#FF7F40" : "black"}
                strokeWidth="1.2"
              />
            </svg>
          )}
        </NavLink>

        <NavLink to={"/products"}>
          {({ isActive }) => (
            <svg
              width="26"
              height="23"
              viewBox="0 0 26 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 9.6895V1.40002H6.45455L9.72727 4.71581H21.7273V8.0316M25 8.30792V8.0316H4.38182L4.21818 8.30792L3.96291 8.85171C2.01218 13.0056 0.99999 17.5479 1 22.148V22.4H21.7273V22.2585C21.7272 17.6229 22.7551 13.0464 24.7349 8.86718L25 8.30792Z"
                stroke={isActive ? "#FF7F40" : "black"}
                strokeWidth="1.2"
              />
            </svg>
          )}
        </NavLink>
      </div>
      <svg
        width="25"
        height="26"
        viewBox="0 0 25 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M25 13.4H8.65957M19.383 8.18263C19.383 8.78472 20.0621 9.81255 20.6371 10.5764C21.1357 11.2489 21.7375 11.8346 22.4192 12.3106C23.1617 12.8209 24.183 13.4 24.9898 13.4C24.183 13.4 23.1617 13.9802 22.4192 14.4894C21.7375 14.9655 21.1357 15.5511 20.6371 16.2237C20.0621 16.9875 19.383 18.0153 19.383 18.6174M15.2979 8.18263V3.48698H14.9619C10.4433 3.48707 5.94829 2.82108 1.61583 1.50959L1.25532 1.40002H1V25.4H1.25532L1.61583 25.2905C5.94828 23.9789 10.4433 23.3129 14.9619 23.3131H15.2979V18.6174"
          stroke="black"
          strokeWidth="1.2"
        />
      </svg>
    </aside>
  );
};
