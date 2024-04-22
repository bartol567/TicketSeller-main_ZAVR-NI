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
            return await _context.Occasions.ToListAsync();
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
            

            await _context.SaveChangesAsync();



            
            return CreatedAtAction("Get", new { id = occasion.Id }, occasion);
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