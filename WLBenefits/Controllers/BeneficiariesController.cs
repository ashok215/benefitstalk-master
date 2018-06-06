using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WLBenefits.Controllers
{
    public class BeneficiariesController : Controller
    {
        // GET: Beneficiaries
        public ActionResult Index()
        {
            return View();
        }
    }
}