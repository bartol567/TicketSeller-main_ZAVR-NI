﻿using System.ComponentModel.DataAnnotations.Schema;

namespace TicketSellerAPI.Models
{
    public class Occasion
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string? OccasionName { get; set; }
        public string? OccasionPlace { get; set; }
        public int OccasionCategoryId { get; set; }
        public DateTime StartTime { get; set; }

        
        public OccasionCategory? OccasionCategory { get; set; }
    }
}
