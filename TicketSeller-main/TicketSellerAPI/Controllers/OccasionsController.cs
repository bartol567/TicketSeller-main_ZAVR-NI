using Microsoft.AspNetCore.Mvc;
using TicketSellerAPI.Data;
using TicketSellerAPI.Models;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;

namespace TicketSellerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OccasionsController : ControllerBase
    {
        private readonly TicketSellerContext _context;

        public OccasionsController(TicketSellerContext context)
        {
            _context = context;
        }

        // GET: api/Occasions
        [HttpGet]
        [EnableCors("CorsPolicy")]
        public async Task<ActionResult<IEnumerable<Occasion>>> GetAll()
        {
            var occasions = await _context.Occasions.ToListAsync();
            foreach (var occasion in occasions)
            {
                occasion.OccasionCategory = _context.OccasionCategories.Where(p => p.Id == occasion.OccasionCategoryId).First();
            }
            return occasions;
        }

        [HttpGet]
        [EnableCors("CorsPolicy")]
        [Route("by-category/{categoryId}")]
        public async Task<ActionResult<IEnumerable<Occasion>>> GetOccasionsByCategoryIdAsync(int categoryId)
        {
            return await _context.Occasions.Where(p => p.OccasionCategoryId == categoryId).ToListAsync();
        }

        // GET: api/Occasions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Occasion>> Get(int id)
        {
            var occasion = await _context.Occasions.FindAsync(id);
            if (occasion == null)
            {
                return NotFound();
            }
            return occasion;
        }

        // POST: api/Occasions
        [HttpPost]
        public async Task<ActionResult<Occasion>> Post(OccasionREST occasionREST)
        {
            var occasion = MapFromREST(occasionREST);
            _context.Occasions.Add(occasion);

            var result = await _context.SaveChangesAsync();

            if (result > 0)
            {
                return CreatedAtAction("Get", new { id = occasion.Id }, occasion);
            }
            else
            {
                return BadRequest("Something went wrong while inserting. Please try again or contact our customer support if the problem persists.");
            }
        }

        // Other CRUD actions (PUT for update, DELETE, etc.) go here...

        private Occasion MapFromREST(OccasionREST occasionREST)
        {
            return new Occasion
            {
                OccasionCategoryId = occasionREST.OccasionCategoryId,
                OccasionName = occasionREST.Name,
                StartTime = occasionREST.StartTime,
                OccasionPlace = occasionREST.OccasionPlace
            };
        }
    }

    

    public class OccasionREST
    {
        public string Name { get; set; }

        public int OccasionCategoryId { get; set; }

        public string OccasionPlace { get; set; }

        public DateTime StartTime { get; set; }
    }
}