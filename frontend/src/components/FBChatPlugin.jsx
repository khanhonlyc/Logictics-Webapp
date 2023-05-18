import MessengerCustomerChat from "react-messenger-customer-chat";

function FBChatPlugin() {
  return (
    <>
      <MessengerCustomerChat
        pageId={process.env.REACT_APP_FB_PAGE_ID}
        // appId="628173431981476"
      />
    </>
  );
}

export default FBChatPlugin;
