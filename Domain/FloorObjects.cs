using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class FloorObjects
    {
        public int FloorObjectsId { get; set; }
        public string floorName { get; set; }
        public string floorObject { get; set; }
        public DateTime dateCreated { get; set; }

    }
}