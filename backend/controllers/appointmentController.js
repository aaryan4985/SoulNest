const axios = require("axios");
const cheerio = require("cheerio");
const transporter = require("../utils/mail_service");

function parseTherapists(html) {
  const $ = cheerio.load(html);
  const therapists = [];

  $(".box").each((i, el) => {
    const $el = $(el);
    
    const name = $el.find(".subHeading").text().trim();
    const designation = $el.find(".desig").text().trim();
    const about = $el.find(".fullDesc").text().trim();
    
    let specialization = "";
    let experience = "";
    let email = "";
    let phone = "";
    let qualification = "";
    let modeOfDelivery = "";
    let location = "";
    let languages = "";

    $el.find("ul li").each((j, li) => {
      const $li = $(li);
      const text = $li.text();
      const link = $li.find("a");
      
      if (text.includes("Area of Specialization:")) {
        specialization = text.replace("Area of Specialization:", "").trim();
      } else if (text.includes("Experience:")) {
        experience = text.replace("Experience:", "").trim();
      } else if (text.includes("Email:")) {
        email = link.attr("href") ? link.attr("href").replace("mailto:", "") : "";
      } else if (text.includes("Mobile No:")) {
        phone = link.attr("href") ? link.attr("href").replace("tel:", "") : "";
      }
    });

    $el.find(".other_data li").each((j, li) => {
      const $li = $(li);
      const text = $li.text();
      
      if (text.includes("Qualification:")) {
        qualification = text.replace("Qualification:", "").trim();
      } else if (text.includes("Mode of Delivery:")) {
        modeOfDelivery = text.replace("Mode of Delivery:", "").trim();
      } else if (text.includes("Location:")) {
        location = text.replace("Location:", "").trim();
      } else if (text.includes("Language:")) {
        languages = text.replace("Language:", "").trim();
      }
    });

    const imageUrl = $el.find(".userImg img").attr("src") || "";

    if (name) {
      therapists.push({
        name,
        designation,
        specialization,
        experience,
        email,
        phone,
        about,
        qualification,
        modeOfDelivery,
        location,
        languages,
        imageUrl
      });
    }
  });

  return therapists;
}

exports.getAppointment = async (req, res) => {
  try {
    const { city, specialization, page = 1, type = "" } = req.query;

    if (!city) {
      return res.status(400).json({ 
        error: "City parameter is required",
        message: "Please provide a city to search for therapists"
      });
    }

    const payload = new URLSearchParams({
      page_no: page,
      state: "",
      city: city,
      type: type,
      specialization: specialization || "",
      mode_of_delivery: "",
      last_page: 1,
    });

    const response = await axios.post(
      "https://www.thelivelovelaughfoundation.org/therapist/load_ajax_data",
      payload.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          "X-Requested-With": "XMLHttpRequest",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        },
        timeout: 5000
      }
    );

    if (!response.data || !response.data.status) {
      return res.status(500).json({
        error: "Invalid response from therapist service",
        message: "The external service returned an invalid response"
      });
    }

    const therapists = parseTherapists(response.data.data);

    const responseData = {
      success: true,
      data: {
        therapists,
        count: therapists.length,
        totalCount: response.data.therapist_total_count || 0,
        currentPage: parseInt(page),
        searchParams: {
          city,
          specialization: specialization || "All",
          type: type || "All"
        }
      },
    };

    return res.json(responseData);

  } catch (error) {
    console.error("Error fetching therapists:", error.message);
    
    if (error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT') {
      return res.status(503).json({
        error: "Service temporarily unavailable",
        message: "The therapist service is currently unavailable. Please try again later."
      });
    }
    
    if (error.response) {
      return res.status(error.response.status).json({
        error: "External service error",
        message: "There was an issue with the therapist service"
      });
    }

    return res.status(500).json({
      error: "Internal server error",
      message: "An unexpected error occurred while fetching therapist data"
    });
  }
};

exports.bookAppointment = async (req, res) => {
  try {
    const { therapistName } = req.body;

    await transporter.sendMail({
      from: `"SoulNest" <${process.env.GOOGLE_ACCOUNT}>`,
      to: "soulnestmail@gmail.com",
      subject: "New Appointment Booking",
      text: `A new appointment has been booked with ${therapistName}`,
    });

    res.json({ success: true, message: "Mail sent successfully" });
  } catch (err) {
    console.error("Mail error:", err);
    res.status(500).json({ success: false, error: "Failed to send mail" });
  }
};