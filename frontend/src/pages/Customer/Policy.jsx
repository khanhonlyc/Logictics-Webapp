import React, { useContext, useEffect } from "react";
import { MainContext } from "../../context/MainContext";

const Policy = () => {
  // Redux
  const { setMetadata } = useContext(MainContext);

  // Set metadata
  useEffect(() => {
    setMetadata((prev) => {
      return {
        ...prev,
        title: "Chính sách | TKTL",
      };
    });
  }, [setMetadata]);

  return (
    <div>
      <div className="relative px-6 text-justify">
        <TitlePage title="Chính sách" />

        <p className="text-base text-[#3A3C3F]">
          <span className="font-bold">Logistic</span> được biết đến là nhà vận
          chuyển với quy mô và năng lực giao hàng đứng trong top vận chuyển tại
          Việt Nam. logistic.vn là đơn vị giao hàng tác động lớn đến khách hàng
          trong bán lẻ trực tuyến. Logistic nỗ lực mỗi ngày để cung cấp dịch vụ
          giao hàng trong ngày và thu tiền hộ uy tín và đáng tin cậy.
        </p>

        <p className="font-bold text-base text-[#3A3C3F]">
          Chính sách giá: Giá vận chuyển tại TOPSHIP thiết lập riêng và so sánh
          luôn rẻ hơn 25-49% so với giá thị trường và không cần cam kết số lượng
          đơn hàng.
        </p>

        <div>
          <h6 className="font-bold text-base text-[#3A3C3F]">
            Chính sách bảo hiểm - đền bù:
          </h6>

          <p className="text-base text-[#3A3C3F]">
            Toàn bộ đơn hàng của Logistic bắt buộc cần đóng bảo hiểm, mức phí
            như sau:
          </p>

          <ul className="text-base text-[#3A3C3F]">
            <li className="list-disc ml-8">
              Hàng hóa có giá trị đóng bảo hiểm {"<"} 1.000.000VNĐ: Miễn phí bảo
              hiểm hàng hóa.
            </li>
            <li className="list-disc ml-8">
              Hàng hóa có giá trị đóng bảo hiểm ={">"} 1.000.000 VNĐ (tối đa là
              20.000.000 VNĐ): Phí bảo hiểm là 0.5% giá trị hàng hoá. (Giá trị
              bảo hiểm này chưa bao gồm thuế VAT).
            </li>
            <li className="list-disc ml-8">
              Logistic sẽ bồi hoàn 100% giá trị đóng bảo hiểm khi mất hàng (tối
              đa 20.000.000 VNĐ) nếu người gửi có giấy tờ chứng minh nguồn gốc
              và giá trị hàng hóa (hoá đơn nhập hàng, bill mua hàng hợp lệ và
              khớp với thông tin sản phẩm trên hệ thống Logistic,..). Trong
              trường hợp người gửi không thể chứng minh nguồn gốc và giá trị
              hàng hoá, bồi thường tối đa 04 lần cước phí vận chuyển.
            </li>
          </ul>

          <p className="text-base text-[#3A3C3F]">
            <span className="font-bold">Lưu ý:</span> Trường hợp hàng hóa hư
            hỏng, giá trị bồi thường được xác định dựa trên mức độ hư hỏng của
            hàng hóa. Logistic không chịu trách nhiệm bồi thường khi xảy ra mất
            mát, hư hỏng nếu KH/người gửi không khai đầy đủ thông tin sản phẩm
            và giá trị hàng hóa.
          </p>
        </div>

        <div>
          <h6 className="font-bold text-base text-[#3A3C3F]">
            Chính sách giao hàng:
          </h6>
          <ul className="text-base text-[#3A3C3F]">
            <li>
              <div>
                <h6 className="font-bold text-base text-[#3A3C3F]">
                  1. Hàng hóa cấm gửi
                </h6>

                <ul>
                  <li className="list-disc ml-8">
                    Các chất ma túy và chất kích thích thần
                  </li>
                  <li className="list-disc ml-8">
                    Vũ khí đạn dược, trang thiết bị kỹ thuật quân sự
                  </li>
                  <li className="list-disc ml-8">
                    Vũ khí thô sơ như dao, kiếm, giáo, mác, lưỡi lê, đao, mã
                    tấu, quả đấm, quả chùy, cung, nỏ …
                  </li>
                  <li className="list-disc ml-8">
                    Các loại văn hóa phẩm đồi trụy, phản động; ấn phẩm, tài liệu
                    nhằm phá hoại trật tự công cộng chống lại Nhà nước Cộng hòa
                    Xã hội Chủ nghĩa Việt Nam.
                  </li>
                  <li className="list-disc ml-8">
                    Vật hoặc chất dễ nổ, dễ cháy và các chất gây nguy hiểm hoặc
                    làm mất vệ sinh, gây ô nhiễm môi trường.
                  </li>
                  <li className="list-disc ml-8">
                    Các loại vật phẩm hàng hóa mà nhà nước cấm lưu thông, cấm
                    kinh doanh, cấm xuất khẩu, nhập khẩu.
                  </li>
                  <li className="list-disc ml-8">
                    Sinh vật sống, thực phẩm yêu cầu bảo quản.
                  </li>
                  <li className="list-disc ml-8">
                    Vật phẩm, ấn phẩm, hàng hóa cấm nhập vào nước nhận.
                  </li>
                  <li className="list-disc ml-8">
                    Tiền Việt Nam, nước ngoài và các giấy tờ có giá trị như
                    tiền; hóa đơn VAT, giấy tờ không thể cấp lại.
                  </li>
                  <li className="list-disc ml-8">
                    Các loại kim khí quý (vàng, bạc, bạch kim…), các loại đá quí
                    hay các sản phẩm khác được chế biến từ kim khí quí, đá quí.
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <div>
                <h6 className="font-bold text-base text-[#3A3C3F]">
                  2. Quy định về hàng hóa vận chuyển đường bộ
                </h6>

                <p className="mb-0 text-base text-[#3A3C3F]">
                  Các hàng hóa thuộc diện cấm vận chuyển bay sẽ được chuyển phát
                  đường bộ, gồm:
                </p>
                <ul>
                  <li className="list-disc ml-8">
                    Pin, sạc dự phòng và các sản phẩm tương tự
                  </li>
                  <li className="list-disc ml-8">
                    Trang sức, hàng điện tử và các hàng hóa giá trị cao (điện
                    thoaị, laptop,..)
                  </li>
                  <li className="list-disc ml-8">
                    Nước hoa, mỹ phẩm dạng xịt, chất lỏng, chất bôṭ
                  </li>
                  <li className="list-disc ml-8">
                    Khí làm lạnh, hợp chất oxy hữu cơ, oxy hóa, chất có nguy cơ
                    phóng xạ, có tính độc, ăn mòn, từ tính,…
                  </li>
                  <li className="list-disc ml-8">
                    Môṭ số hàng hóa khác theo quy định hàng không
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <div>
                <h6 className="font-bold text-base text-[#3A3C3F]">
                  3. Quy định đóng gói và bảo quản hàng hóa
                </h6>

                <ul>
                  <li className="list-disc ml-8">
                    Logistic chỉ nhận hàng hóa đã được đóng gói, bảo quản từ
                    phía người bán (Xem chi tiết). Logistic sẽ giao hàng nguyên
                    đai nguyên kiện, không đồng kiểm hàng hóa. Logistic từ chối
                    bồi thường với hàng hóa hỏng hóc do lỗi từ phía người gửi
                    (đóng gói không đảm bảo gây vỡ hỏng hàng hóa,…).
                  </li>
                  <li className="list-disc ml-8">
                    Logistic từ chối bồi thường với hàng hóa hỏng do đặc tính tự
                    nhiên sản phẩm (dễ nóng chảy, …).
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <div>
                <h6 className="font-bold text-base text-[#3A3C3F]">
                  4. Quy định miễn trừ trách nhiệm đền bù, bồi thường
                </h6>

                <ul>
                  <li className="list-disc ml-8">
                    Hàng hóa đã được giao đúng thoả thuận.
                  </li>
                  <li className="list-disc ml-8">
                    Hàng hóa bị hư hại, mất mát do lỗi của bên gửi hàng.
                  </li>
                  <li className="list-disc ml-8">
                    Bị cơ quan nhà nước có thẩm quyền tịch thu hoặc tiêu hủy do
                    nội dung bên trong vi phạm các qui định cấm gửi của pháp
                    luật hoặc do không xác minh được nguồn gốc, xuất xứ.
                  </li>
                  <li className="list-disc ml-8">
                    Người gửi không cung cấp đầy đủ thông tin các giấy tờ cần
                    thiết phục vụ cho việc giao hàng dẫn đến các thiệt hại như
                    hàng hoá hư hỏng do để lâu, bị phạt vi phạm, bị tịch thu
                    hàng hoá.
                  </li>
                </ul>

                <p className="text-base text-[#3A3C3F]">
                  <span className="font-bold">Chú ý:</span> Hàng hóa cần có giấy
                  tờ chứng minh nguồn gốc, xuất xứ hoặc hóa đơn VAT đi kèm. Nếu
                  không, GHTK không chịu trách nhiệm trong trường hợp hàng hóa
                  bị Quản lý thị trường và các cơ quan chức năng thu giữ theo
                  quy định của pháp luật.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Components
const TitlePage = ({ title }) => (
  <div className="pt-3 mb-4">
    <h3 className="font-bold mb-1 text-2xl mt-2 uppercase">{title}</h3>
  </div>
);

export default Policy;
