import "./header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">Wecooking</span>
        <span className="headerTitleLg">Blog</span>
      </div>
      <img
        className="headerImg"
        src="https://images.squarespace-cdn.com/content/v1/5abd8830620b85fa99f1428d/1572819105636-LCMJ6A2M6IJXFSF31YKT/IMG_4457-Edit+%281%29.JPG?format=1500w"
        alt=""
      />
    </div>
  );
}
