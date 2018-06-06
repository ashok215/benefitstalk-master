using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WLBenefits.Controllers
{
    public class BenefitsController : Controller
    {
        // GET: Benefits
        public ActionResult Index()
        {
            return View();
        }
    }
}